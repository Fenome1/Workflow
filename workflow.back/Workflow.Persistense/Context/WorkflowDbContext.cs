﻿using Microsoft.EntityFrameworkCore;
using Workflow.Core.Models;

namespace Workflow.Persistense.Context;

public partial class WorkflowDbContext : DbContext
{
    public WorkflowDbContext()
    {
    }

    public WorkflowDbContext(DbContextOptions<WorkflowDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agency> Agencies { get; set; }

    public virtual DbSet<Board> Boards { get; set; }

    public virtual DbSet<Column> Columns { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<InvitationStatus> InvitationStatuses { get; set; }

    public virtual DbSet<Link> Links { get; set; }

    public virtual DbSet<Objective> Objectives { get; set; }

    public virtual DbSet<Priority> Priorities { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agency>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.Owner).WithMany(p => p.AgenciesNavigation)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Agencies_Users");

            entity.HasMany(d => d.Users).WithMany(p => p.Agencies)
                .UsingEntity<Dictionary<string, object>>(
                    "AgenciesUser",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_AgenciesUsers_Users"),
                    l => l.HasOne<Agency>().WithMany()
                        .HasForeignKey("AgencyId")
                        .HasConstraintName("FK_AgenciesUsers_Agencies"),
                    j =>
                    {
                        j.HasKey("AgencyId", "UserId");
                        j.ToTable("AgenciesUsers");
                    });
        });

        modelBuilder.Entity<Board>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(25);

            entity.HasOne(d => d.Project).WithMany(p => p.Boards)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK_Boards_Projects");
        });

        modelBuilder.Entity<Column>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(25);

            entity.HasOne(d => d.Board).WithMany(p => p.Columns)
                .HasForeignKey(d => d.BoardId)
                .HasConstraintName("FK_Columns_Boards");
        });

        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.InvitationId).HasName("PK_AgencyInvitations");

            entity.Property(e => e.InvitationStatusId).HasDefaultValue(1);

            entity.HasOne(d => d.Agency).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.AgencyId)
                .HasConstraintName("FK_AgencyInvitations_Agencies");

            entity.HasOne(d => d.InvitationStatus).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.InvitationStatusId)
                .HasConstraintName("FK_AgencyInvitations_InvitationStatuses");

            entity.HasOne(d => d.User).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AgencyInvitations_Users");
        });

        modelBuilder.Entity<InvitationStatus>(entity =>
        {
            entity.Property(e => e.InvitationStatusId).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.HasData([
                new InvitationStatus
                {
                    InvitationStatusId = 1,
                    Name = "Ожидание"
                },
                new InvitationStatus
                {
                    InvitationStatusId = 2,
                    Name = "Принято"
                },
                new InvitationStatus
                {
                    InvitationStatusId = 3,
                    Name = "Отклонено"
                }
            ]);
        });

        modelBuilder.Entity<Link>(entity =>
        {
            entity.HasIndex(e => e.AgencyId, "IX_Links").IsUnique();

            entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Token).HasMaxLength(255);

            entity.HasOne(d => d.Agency).WithOne(p => p.Link)
                .HasForeignKey<Link>(d => d.AgencyId)
                .HasConstraintName("FK_Links_Agencies");
        });

        modelBuilder.Entity<Objective>(entity =>
        {
            entity.HasKey(e => e.ObjectiveId).HasName("PK_Tasks");

            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(500);

            entity.HasOne(d => d.Column).WithMany(p => p.Objectives)
                .HasForeignKey(d => d.ColumnId)
                .HasConstraintName("FK_Objectives_Columns");

            entity.HasOne(d => d.Priority).WithMany(p => p.Objectives)
                .HasForeignKey(d => d.PriorityId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Objectives_Priority");

            entity.HasMany(d => d.Users).WithMany(p => p.Objectives)
                .UsingEntity<Dictionary<string, object>>(
                    "ObjectivesUser",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_ObjectivesUsers_Users"),
                    l => l.HasOne<Objective>().WithMany()
                        .HasForeignKey("ObjectiveId")
                        .HasConstraintName("FK_ObjectivesUsers_Objectives"),
                    j =>
                    {
                        j.HasKey("ObjectiveId", "UserId").HasName("PK_TasksUsers");
                        j.ToTable("ObjectivesUsers");
                    });
        });

        modelBuilder.Entity<Priority>(entity =>
        {
            entity.HasKey(e => e.PriorityId).HasName("PK_Priority");

            entity.Property(e => e.PriorityId).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasData([
                new Priority
                {
                    PriorityId = 1,
                    Name = "Низкий"
                },
                new Priority
                {
                    PriorityId = 2,
                    Name = "Средний"
                },
                new Priority
                {
                    PriorityId = 3,
                    Name = "Высокий"
                }
            ]);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(25);

            entity.HasOne(d => d.Agency).WithMany(p => p.Projects)
                .HasForeignKey(d => d.AgencyId)
                .HasConstraintName("FK_Projects_Agencies");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasIndex(e => e.UserId, "UQ_UserId").IsUnique();

            entity.Property(e => e.Token).HasMaxLength(450);

            entity.HasOne(d => d.User).WithOne(p => p.RefreshToken)
                .HasForeignKey<RefreshToken>(d => d.UserId)
                .HasConstraintName("FK_RefreshTokens_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email, "UQ_Users").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(125);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}